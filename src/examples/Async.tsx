/*
    If derived data is from ... > Then use ...
    1) atom / selector > selector
    2) React (e.g. component prop / useState / Redux) > selectorFamily
    3) Both > selectorFamily
*/

import {Container, Heading, Text} from '@chakra-ui/layout'
import {Select} from '@chakra-ui/select'
import {Suspense, useState} from 'react'
import {atomFamily, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil'
import {getWeather} from './fakeAPI'

const userState = selectorFamily({
    key: 'user',
    get: (userId: number) => async () => {
        // recoil caches data for selectors of same input
        const userData = await fetch(`http://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json())
        return userData
    },
})

const weatherRequestIdState = atomFamily({
    key: 'weatherRequestId',
    default: 0,
})

const useRefetchWeather = (userId: number) => {
    const setRequestId = useSetRecoilState(weatherRequestIdState(userId))

    return () => setRequestId((id) => id + 1)
}

const weatherState = selectorFamily({
    key: 'weather',
    get:
        (userId: number) =>
        async ({get}) => {
            get(weatherRequestIdState(userId))

            const user = get(userState(userId))
            const weather = getWeather(user.address.city)
            return weather
        },
})

const UserWeather = ({userId}: {userId: number}) => {
    const user = useRecoilValue(userState(userId))
    const weather = useRecoilValue(weatherState(userId))
    const refetch = useRefetchWeather(userId)
    return (
        <div>
            <Text>
                <b>Weather for {user.address.city}:</b> {weather}°C
            </Text>
            <Text onClick={refetch}>(Click to Refresh Weather)</Text>
        </div>
    )
}

const UserData = ({userId}: {userId: number}) => {
    const user = useRecoilValue(userState(userId))
    useRecoilValue(weatherState(userId))
    if (!user) return null

    return (
        <div>
            <Heading as="h2" size="md" mb={1}>
                User data:
            </Heading>
            <Text>
                <b>Name:</b> {user.name}
            </Text>
            <Text>
                <b>Phone:</b> {user.phone}
            </Text>
            <Suspense fallback={<div>Loading weather...</div>}>
                <UserWeather userId={userId} />
            </Suspense>
        </div>
    )
}

export const Async = () => {
    const [userId, setUserId] = useState<undefined | number>(undefined)

    return (
        <Container py={10}>
            <Heading as="h1" mb={4}>
                View Profile
            </Heading>
            <Heading as="h2" size="md" mb={1}>
                Choose a user:
            </Heading>
            <Select
                placeholder="Choose a user"
                mb={4}
                value={userId}
                onChange={(event) => {
                    const value = event.target.value
                    setUserId(value ? parseInt(value) : undefined)
                }}
            >
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </Select>
            {userId !== undefined && (
                <Suspense fallback={<div>Loading...</div>}>
                    <UserData userId={userId} />
                </Suspense>
            )}
        </Container>
    )
}
