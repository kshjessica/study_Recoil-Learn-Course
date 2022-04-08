import {InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack} from '@chakra-ui/react'
import {selector, selectorFamily, useRecoilState, useRecoilValue} from 'recoil'
import {elementState, selectedElementState} from './components/Rectangle/Rectangle'
import _, {property} from 'lodash'
import produce from 'immer'
import {ImageInfo, ImageInfoFallback} from './components/ImageInfo'
import {Suspense} from 'react'

/*
    Benefits of SelectorFamily
    - extending benefits of selector(get/set logic combined, same API as Atoms, shareable and self-contained state)
    - async data fetching
    - similar selectors that behave slightly differently depending on the parameter
    Tips
    - the param should be serializable
*/

export const EditPropertyState = selectorFamily<any, {path: string; id: number}>({
    key: 'editProperty',
    get:
        ({path, id}) =>
        ({get}) => {
            const element = get(elementState(id))
            return _.get(element, path)
        },
    set:
        ({path, id}) =>
        ({get, set}, newValue) => {
            const element = get(elementState(id))
            const newElement = produce(element, (draft) => {
                _.set(draft, path, newValue)
            })
            set(elementState(id), newElement)
        },
})

const hasImageState = selector({
    key: 'hasImage',
    get: ({get}) => {
        const id = get(selectedElementState)
        if (id === null) return

        const element = get(elementState(id))
        return element.image !== undefined
    },
})

export const EditProperties = () => {
    const selectedElement = useRecoilValue(selectedElementState)
    const hasImage = useRecoilValue(hasImageState)
    if (selectedElement == null) return null

    return (
        <Card>
            <Section heading="Position">
                <Property label="Top" path="style.position.top" id={selectedElement} />
                <Property label="Left" path="style.position.left" id={selectedElement} />
            </Section>
            <Section heading="Size">
                <Property label="Width" path="style.size.width" id={selectedElement} />
                <Property label="Height" path="style.size.height" id={selectedElement} />
            </Section>
            {hasImage && (
                <Section heading="Image">
                    <Suspense fallback={<ImageInfoFallback />}>
                        <ImageInfo />
                    </Suspense>
                </Section>
            )}
        </Card>
    )
}

const Section: React.FC<{heading: string}> = ({heading, children}) => {
    return (
        <VStack spacing={2} align="flex-start">
            <Text fontWeight="500">{heading}</Text>
            {children}
        </VStack>
    )
}

const Property = ({label, path, id}: {label: string; path: string; id: number}) => {
    const [value, setValue] = useRecoilState(EditPropertyState({path, id}))

    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={value} onChange={(_, value) => setValue(value)}>
                    <NumberInputField borderRadius="md" />
                    <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
                </NumberInput>
            </InputGroup>
        </div>
    )
}

const Card: React.FC = ({children}) => (
    <VStack
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="white"
        padding={2}
        boxShadow="md"
        borderRadius="md"
        spacing={3}
        align="flex-start"
        onClick={(e) => e.stopPropagation()}
    >
        {children}
    </VStack>
)
