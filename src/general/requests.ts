const requests = {
    fetchUsers: "http://localhost:3000/users",
    auth: {
        signIn: "http://localhost:3000/signin",
    },
    devs: {
        ping: "http://localhost:3000/test/ping",
    },
    fetchImage: (imagePath: string) => `http://localhost:3000/images/${imagePath}`,
    trainRecord: {
        fetchIntervalRates: (id: number) => `http://localhost:3000/interval_rates?id=${id}`,
        post: "http://localhost:3000/train_records",
        fetch: (id: number) => `http://localhost:3000/train_records/${id}`,
    },
    questionnaire: {
        fetchTemplate: (questionnaireName: string) => `http://localhost:3000/questionnaires/${questionnaireName}`,
        post: "http://localhost:3000/questionnaires",
    }
}

export default requests;
