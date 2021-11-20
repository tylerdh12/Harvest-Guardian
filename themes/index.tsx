import React, { createContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import { ThemeProvider } from 'styled-components/native'
import darkTheme from './dark'
import lightTheme from './light'

const defaultMode = Appearance.getColorScheme()

const ThemeContext = createContext({
	mode: defaultMode,
	setMode: mode => console.log(mode),
})

export const useTheme = () => React.useContext(ThemeContext)

const ManageThemeProvider = ({ children }) => {
	const [themeState, setThemeState] = useState(defaultMode)
	const setMode = mode => {
		setThemeState(mode)
	}
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setThemeState(colorScheme)
		})
		return () => subscription.remove()
	}, [])
	return (
		<ThemeContext.Provider value={{ mode: themeState, setMode }}>
			<ThemeProvider
				theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}
			>
				<>
					<StatusBar
						barStyle={themeState === 'dark' ? 'dark-content' : 'light-content'}
					/>
					{children}
				</>
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

const ThemeManager = ({ children }) => (
	<AppearanceProvider>
		<ManageThemeProvider>{children}</ManageThemeProvider>
	</AppearanceProvider>
)

export default ThemeManager
