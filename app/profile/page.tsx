'use client'

import {
  Avatar,
  Badge,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'

import { ContactsFrom } from './components/ContactsFrom'
import { PasswordForm } from './components/PasswordForm'
import { PersonalInfoForm } from './components/PersonalInfoForm'

import classes from './styles.module.css'

import { Breadcrumbs, Container } from '@/app/components'

import { useAppSelector } from '@/lib/store/hooks'
import { selectAccount } from '@/lib/store/features/account/accountSlice'

export default function ProfilePage() {
  const account = useAppSelector(selectAccount)

  return (
    <Container>
      <Stack gap={40} py={80} w={970}>
        <Breadcrumbs
          items={[
            { title: 'Главная', href: '/' },
            { title: 'Профиль', href: '/profile' },
          ]}
        />
        <Title className={classes.title}>Профиль</Title>

        <Group gap={20}>
          <Avatar size="64px"></Avatar>

          <Group gap={8}>
            <Text className={classes.userName}>
              {account?.firstName || 'User'}
            </Text>
            <Text className={classes.userName}>
              {account?.lastName || 'User'}
            </Text>
          </Group>

          <Group gap={10}>
            <Badge variant="light" color="teal" radius={5}>
              Активный
            </Badge>

            <Badge variant="filled" color="#13A3B9" radius={5}>
              Пользователь
            </Badge>
          </Group>
        </Group>

        <Divider />

        <PersonalInfoForm />

        <Divider />

        <ContactsFrom />

        <Divider />

        <PasswordForm />
      </Stack>
    </Container>
  )
}
