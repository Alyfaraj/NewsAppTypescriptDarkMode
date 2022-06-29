const config = {
    screens: {
        HomeStack: {
            path: "home",
            screens: {
                DeatilsScreen: 'news/:id',
            }
        },
    },
};

const linking = {
    prefixes: ["demo://app"],
    config,
};

export default linking;