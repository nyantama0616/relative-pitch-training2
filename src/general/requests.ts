// const baseURL = "http://180.43.174.138:8102";
const baseURL = "http://localhost:8102";
// const baseURL = "http://localhost:3000";

const requests = {
    fetchUsers: `${baseURL}/users`,
    auth: {
        signIn: `${baseURL}/signin`,
    },
    devs: {
        ping: `${baseURL}/test/ping`,
    },
    fetchImage: (imagePath: string) => `${baseURL}/images/${imagePath}`,
    trainRecord: {
        fetchIntervalRates: (id: number) => `${baseURL}/interval_rates?id=${id}`,
        post: `${baseURL}/train_records`,
        fetch: (id: number) => `${baseURL}/train_records/${id}`,
        fetchMeans: (id: number) => `${baseURL}/train_records/${id}/means`,
    },
    questionnaire: {
        fetchTemplate: (questionnaireName: string) => `${baseURL}/questionnaires/${questionnaireName}`,
        post: `${baseURL}/questionnaires`,
    }
}

export default requests;
