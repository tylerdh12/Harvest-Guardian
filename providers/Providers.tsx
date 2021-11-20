import React from 'react'
import { Routes } from '../Routes'
import ThemeManager from '../themes'
import { AuthProvider } from './AuthProvider'

export const Providers = ({}) => {
	return (
		<ThemeManager>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeManager>
	)
}
