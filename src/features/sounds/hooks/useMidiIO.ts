import React, { useState, useEffect } from "react";
import { WebMidi, Input, Output } from "webmidi";
import IMidiIO from "../interfaces/IMidiIO";
import { IMidiMessage, MessageType } from "../interfaces/IMidiMessage";

export default function useMidiIO(): IMidiIO {
    const [inputDevices, setInputDevices] = useState<string[]>([]);
    const [outputDevices, setOutputDevices] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<IMidiMessage | null>(null);

    const [currentInput, setCurrentInput] = useState<Input | null>(null); 
    const [currentOutput, setCurrentOutput] = useState<Output | null>(null); // letじゃなくてstateにしないと、途中でnullになる。なんで？

    useEffect(() => {
        WebMidi
            .enable()
            .then(onEnabled)
            .catch(err => alert(err));
    }, []);

    //設定用UIができるまでは、ここでデバイスを指定する
    useEffect(() => {
        const MidiDevice = "Roland A-49";
        if (inputDevices.includes(MidiDevice)) {
            setInput(MidiDevice);
            console.log(`Connected to ${MidiDevice} as input`);
        }

        if (outputDevices.includes(MidiDevice)) {
            setOutput(MidiDevice);
            console.log(`Connected to ${MidiDevice} as output`);
        }
    }, [inputDevices, outputDevices]);

    function onEnabled() {
        updateAvailableDevices();
    }

    function setInput(deviceName: string) {
        currentInput?.removeListener("noteon");
        currentInput?.removeListener("noteoff");

        setCurrentInput(prev => {
            const newInput = WebMidi.inputs.find(input => input.name == deviceName) || null;
            
            if (newInput) {
                newInput.addListener("noteon", e => {
                    setInputMessage({ type: MessageType.On, note: e.note.number })
                });

                newInput.addListener("noteoff", e => {
                    setInputMessage({ type: MessageType.Off, note: e.note.number })
                });
            }

            return newInput;
        });
    }
    
    function setOutput(deviceName: string) {
        setCurrentOutput(prev => {
            prev?.destroy();
            const newOutput = WebMidi.outputs.find(output => output.name == deviceName) || null;
            newOutput?.open();
            return newOutput;
        });
    }

    function sendMessage(message: IMidiMessage) {
        if (message.type == MessageType.On) {
            // currentOutput?.playNote(message.number, { duration: 200 }); //こうするとドラムなどの変な音が一緒に鳴る
            const duration = message.options?.duration;
            currentOutput?.channels[1].playNote(message.note, { duration: duration, attack: 0.6 }); //これでピアノの音だけ鳴らせる
        } else {
            currentOutput?.channels[1].stopNote(message.note); //なぜかこれでNoteOffできない -> なぜかできるようになった
        }        
    }

    function updateAvailableDevices() {
        setInputDevices(WebMidi.inputs.map(device => device.name));
        setOutputDevices(WebMidi.outputs.map(device => device.name));
    }

    return {
        availableInputDevices: inputDevices,
        availableOutputDevices: outputDevices,
        currentInputDevice: currentInput?.name || "No Device",
        currentOutputDevice: currentOutput?.name || "No Device",
        setInput,
        setOutput,
        inputMessage,
        sendMessage,
        updateAvailableDevices
    }
}
