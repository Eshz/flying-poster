import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				// Existing fonts
				'playfair': ['Playfair Display', 'serif'],
				'roboto': ['Roboto', 'sans-serif'],
				'merriweather': ['Merriweather', 'serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
				'opensans': ['Open Sans', 'sans-serif'],
				'lora': ['Lora', 'serif'],
				'raleway': ['Raleway', 'sans-serif'],
				
				// New academic fonts
				'crimsontext': ['Crimson Text', 'serif'],
				'sourceserifpro': ['Source Serif Pro', 'serif'],
				'ebgaramond': ['EB Garamond', 'serif'],
				'inter': ['Inter', 'sans-serif'],
				'librewilson': ['Libre Baskerville', 'serif'], // Using Libre Baskerville as alternative
				'nunito': ['Nunito', 'sans-serif'],
				'cormorantgaramond': ['Cormorant Garamond', 'serif'],
				'worksans': ['Work Sans', 'sans-serif'],
				'oldstandardtt': ['Old Standard TT', 'serif'],
				'karla': ['Karla', 'sans-serif'],
				'spectral': ['Spectral', 'serif'],
				'publicsans': ['Public Sans', 'sans-serif'],
				'vollkorn': ['Vollkorn', 'serif'],
				'firasans': ['Fira Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				poster: {
					// Original colors
					blue: '#4052b6',
					lightblue: '#e6ebff',
					gray: '#f5f7ff',
					// Academic color palette
					navy: '#0A192F',
					teal: '#64FFDA',
					slate: '#8892B0',
					lightSlate: '#CCD6F6',
					lightestSlate: '#E6F1FF',
					// Accessible color combinations
					darkBlue: '#1E3A8A',
					lightBlue: '#BFDBFE',
					darkGreen: '#065F46',
					lightGreen: '#D1FAE5',
					darkPurple: '#581C87',
					lightPurple: '#E9D5FF',
					darkRed: '#991B1B',
					lightRed: '#FEE2E2',
					
					// New Pastel Theme Colors
					// Soft Blues
					pastelBlue: '#E6F3FF',
					deepBlue: '#2D5AA0',
					
					// Soft Purples
					pastelPurple: '#F0E6FF',
					deepPurple: '#5B2C87',
					
					// Soft Lavender (matching the reference image)
					pastelLavender: '#E8E4F3',
					deepLavender: '#3F2E5B',
					
					// Mixed Purple-Blue (from uploaded color palette)
					purpleBlueLight: '#BBCDE8',
					purpleBlueDark: '#202B5B',
					purpleBlueAlt: '#B0C6F3',
					purpleBlueAltDark: '#3E3C72',
					
					// Soft Mint
					pastelMint: '#E6F7F1',
					deepMint: '#1B5E3F',
					
					// Soft Rose
					pastelRose: '#FFF0F5',
					deepRose: '#8B2252',
					
					// Soft Peach
					pastelPeach: '#FFF5E6',
					deepPeach: '#B5620E',
					
					// Academic theme
					academicLight: '#F8FAFF',
					academicDark: '#1E3A8A',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
