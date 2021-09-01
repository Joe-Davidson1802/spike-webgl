export const ButtonStyles = {
    // The styles all button have in common
    baseStyle: {
        fontWeight: "bold",
        borderRadius: "50px", // <-- border radius is same for all variants and sizes
        bg: "secondary",
        color: "white",
        boxShadow:"2xl",
        transition: "0.3s",
        m:"10px"
    },
    // Two sizes: sm and md
    sizes: {
        sm: {
            fontSize: {base: "xs", md: "sm"}
        },
        md: {
            fontSize: "md",
            px: 6, // <-- these values are tokens from the design system
            py: 4, // <-- these values are tokens from the design system
        },
        lg: {
            fontSize: {base: "sm", md: "lg"},
            py: {base: 4, md: 8},
            w: "100vw",
            // h="70px",
            maxW:{base: "210px", sm: "250px", md: "300px", lg: "350px", },
            minW: "auto",
        }
    },
    // Two variants: outline and solid
    variants: {
        outline: {
            border: "2px solid",
            borderColor: "secondary",
            color: "secondary",
            bg: "primary",
            _hover:{ background: "secondary", color: "white" },
            _active:{ background: "secondary" },
        },
        solid: {
            bg: "secondary",
            color: "white",
            border: "2px solid",
            borderColor: "secondary",
            _hover:{ background: "secondary", color: "white" },
            _active:{ background: "secondary" },
        },
        "is-attached-off": {
            bg: "tertiary",
            color: "secondary",
            size: "sm",
            boxShadow: "md",
            _hover:{ background: "secondary", color: "white" },
            _active:{ background: "secondary" },
            w: "auto",
            px: {base: "20px"},
            py: {base: "10px", md: "20px"},
        },
        "is-attached-on": {
            bg: "secondary",
            color: "white",
            size: "sm", 
            boxShadow: "md",
            _hover: { background: "secondary", color: "white" },
            _active: { background: "secondary" },
            w: "auto",
            px: {base: "30px", md: "50px"},
            py: {base: "10px", md: "20px"},
        },
        "main-button": {
            _hover: { bg: "secondary" },
            _active: { bg: "secondary" },
        }
    },
    // The default size and variant values
    defaultProps: {
        size: "lg",
        variant: "solid",
    },
}