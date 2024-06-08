import { Group } from '@mantine/core'

import { Link } from '@/app/components'

import { NAV_LINKS } from '@/lib/constants'

import classes from './styles.module.css'

export const NavLinks = () => {
	return (
		<Group>
			{NAV_LINKS.map(link => (
				<Link className={classes.link} href={link.path} key={link.label}>
					{link.label}
				</Link>
			))}
		</Group>
	)
}
