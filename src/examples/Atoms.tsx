import {atom, useRecoilState, useRecoilValue} from 'recoil'

// atom shares state with other components
// Recoil's API works similar to React's useState
// recommended convention is to name atom as `${key}Atom`
const darkModeAtom = atom({
    key: 'darkMode',
    default: false,
})

const DarkModeSwitch = () => {
    // const [darkMode, setDarkMode] = useState(false)
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)

    return (
        <input
            type="checkbox"
            checked={darkMode}
            onChange={(event) => {
                setDarkMode(event.currentTarget.checked)
            }}
        />
    )
}

const Buttons = () => {
    // const [darkMode, setDarkMode] = useState(false)
    const darkMode = useRecoilValue(darkModeAtom)
    return (
        <button style={{backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black'}}>
            My UI Button
        </button>
    )
}

export const Atoms = () => {
    return (
        <div>
            <div>
                <DarkModeSwitch />
            </div>
            <div>
                <Buttons />
            </div>
        </div>
    )
}
