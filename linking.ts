const config = {
    screens: {
        HomeStack: {
            path: "home",
            screens: {
                DeatilsScreen: 'news/:articleTitle',
            }
        },
    },
};

const linking = {
    prefixes: ["demo://app"],
    config,
};

export default linking;