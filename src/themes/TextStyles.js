export const TextStyles = {
    // Styles for the base style
    baseStyle: {
        my: "10px",
        // maxW: {sm: "600px"},
        color: "font",
        // fontSize:{base: "md", md: "md"}
    },
    // Styles for the size variations
    sizes: {
        // xs: {},
        // sm: {},
        // md: {
        //     // fontSize: {base: "18px", sm: "18px", md: "20px", lg: "20px"}
        // },
        // lg: {},
    },
    // Styles for the visual style variations
    variants: {
        "responsive": {
            fontSize: { base: "xs", sm: "sm", md: "md" },
            // my: {base: "0px", sm: "5px", md: "10px"}
        },
        "responsive-sm": {
            fontSize: { base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" },
            // my: {base: "0px", sm: "5px", md: "10px"}
        },
        "insurance-price": {
            fontSize: { base: "25px", sm: "35px", md: "45px", lg: "55px" },
            color: "font",
            m: "0",
            fontFamily: "Noto Sans JP",
            fontWeight: "900"
        },
        "insurance-price-small": {
            fontSize: { base: "17.5px", sm: "25px", md: "30px" },
            color: "font",
            m: "0",
            fontFamily: "Noto Sans JP",
            fontWeight: "900"
        },
        "insurance-price-xsmall": {
            fontSize: { base: "12.5px", sm: "20px", md: "25px" },
            color: "font",
            m: "0",
            fontFamily: "Noto Sans JP",
            fontWeight: "900"
        },
        "above-button-text": {
            color: "secondary",
            mb: { base: "10px", md: "20px", lg: "30px" },
            cursor: "pointer",
            fontSize: { base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" },
        },
        "below-button-text": {
            color: "secondary",
            mt: { base: "10px", md: "20px", lg: "30px" },
            cursor: "pointer",
            fontSize: { base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" },
        },
        "table-text": {
            color: "secondary",
            m: "0px",
            fontSize: "12px",
        },
        "table-text-price": {
            color: "font",
            m: "0px",
            fontSize: "16px",
        }
    },
    // The default `size` or `variant` values
    defaultProps: {
        // fontSize: 
    },

}