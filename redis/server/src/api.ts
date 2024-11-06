export const api = async () => {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000))

    return [
        { id: "1", name: "lola ji", work: "hilana" },
        { id: "2", name: "lola ji", work: "hilana" },
        { id: "3", name: " ji", work: "hilana" },

        { id: "4", name: " ji", work: "hilana" },
        { id: "5", name: " ji", work: "hilana" },
        { id: "6", name: " ji", work: "hilana" },
        { id: "7", name: "lola ji", work: "hilana" },
    ]
}