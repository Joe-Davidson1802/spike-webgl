export const HeadingStyles = {
    // Styles for the base style
    baseStyle: {
        my: "20px", 
        // isTruncated: true,
        color: "secondary",
        fontFamily: "Noto Sans JP",
        fontWeight: "900"
    },
    // Styles for the size variations
    sizes: {
        // xs: {
        //     fontSize: {base: "60px", md: "80px", lg: "100px",  xl: "120px"}
        // },
        // sm: {
        //     fontSize: {base: "60px", md: "60px", lg: "70px",  xl: "80px"}
        // },
        // md: {
        //     fontSize: {base: "80px", md: "80px", lg: "100px",  xl: "120px"}
        // },
        // lg: {
        //     fontSize: {base: "100px", md: "120px", lg: "140px",  xl: "160px"}
        // },
        xl: {
            fontSize: {base: "100px", md: "120px", lg: "140px",  xl: "160px"}
        },
        "4xl": {
            fontSize: {base: "100px", md: "120px", lg: "140px",  xl: "200px"}
        }
    },
    // Styles for the visual style variations
    variants: {
        "logo": {
            fontFamily: 'Saira'
        },
        "heading-1": {
            fontSize: "50px"
        },
        "insurance-price": {
            fontSize: { base: "50px", sm: "70px", md: "90px", lg: "110px" },
            color: "font",
            m:"0"
        },
        "insurance-price-small": {
            fontSize: { base: "35px", sm: "50px", md: "60px" },
            color: "font",
            m:"0"
        },
        "insurance-price-xsmall": {
            fontSize: { base: "25px", sm: "40px", md: "50px" },
            color: "font",
            m:"0"
        }
    },
    // The default `size` or `variant` values
    defaultProps: {
        size: "md",
        as: "h2"
    },
}