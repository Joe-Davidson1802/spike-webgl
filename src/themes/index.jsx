import { extendTheme } from '@chakra-ui/react'

import { ButtonStyles as Button } from './ButtonStyles'
import { GlobalStyles as global } from './GlobalStyles'
import { HeadingStyles as Heading } from './HeadingStyles'
import { SliderStyles as Slider } from './SliderStyles'
import { TdStyles as Td } from './TdStyles'
import { TextStyles as Text } from './TextStyles'
import './fonts.css'

export const zeroTheme = extendTheme({
    styles: {
        global,
    },
    components: {
        Button,
        Text,
        Heading,
        Td,
        Slider,
    },
    colors: {
        primary: '#C9E3DD',
        secondary: '#07745B',
        tertiary: '#DDEEEC',
        font: '#313532',
        grey: '#c0c0c0',
        secondaryScheme: {
            50: '#defff8',
            100: '#b3fceb',
            200: '#87f8de',
            300: '#5af5d1',
            400: '#34f1c3',
            500: '#21d7ab',
            600: '#14a884',
            700: '#07785e',
            800: '#004839',
            900: '#001a12',
        },
    },
})
