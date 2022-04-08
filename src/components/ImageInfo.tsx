import {Box, Text, VStack} from '@chakra-ui/layout'
import {Skeleton} from '@chakra-ui/skeleton'

export const ImageInfo = () => {
    return (
        <VStack spacing={2} alignItems="flex-start" width="100%">
            <Info label="Author" value="Value goes here" />
            <Info label="Image URL" value="Value goes here" />
        </VStack>
    )
}

export const Info = ({label, value}: {label: string; value?: string}) => {
    return (
        <Box width="175px">
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            {value === undefined ? <Skeleton width="100%" height="21px" /> : <Text fontSize="14px">{value}</Text>}
        </Box>
    )
}
