import { createTheme } from "@material-ui/core/styles";

const ChronicleTheme = createTheme({
    typography: {
        useNextVariants: true,
        fontFamily: ["Baskerville, ArmBoloragir"],
    },
    palette: {
        primary: {
            main: "#AB5526",
        },

        secondary: {
            main: "#A193AC",
        },
    },
});

export default ChronicleTheme;
