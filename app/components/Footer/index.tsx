import Image from 'next/image'
import { AppShellFooter, Box, Center, Group, Text } from '@mantine/core'

import classes from './styles.module.css'
import { Container, Link } from '@/app/components'

import { LogoIcon } from '@/public/icons'
import { FirstPartnerImg } from '@/public/images'

export function Footer() {
  return (
    <AppShellFooter className={classes.footer}>
      <Container>
        <Box className={classes.content}>
          <Box>
            <Image alt="Logo" src={LogoIcon} />
            <Text className={classes.text} mb={20} mt={20}>
              Автоматизированная информационная
              <br />
              система «Реестры»
            </Text>
            <Text className={classes.text}>
              © АИС «Реестры», 2022.
              <br />
              Все права защищены.
            </Text>
          </Box>

          <Box>
            <Text className={classes.title} mb={20}>
              Техническая поддержка
            </Text>
            <Text className={classes.text}>+375 25 111 22 33 </Text>
            <Text className={classes.text}>+375 29 222 44 55</Text>
            <Text className={classes.text}>dev@agsr.by</Text>
            <Link className={classes.link} href="mailto:dev@agsr.by">
              Связаться с поддержкой
            </Link>
          </Box>

          <Box>
            <Text className={classes.title} mb={20}>
              Контакты
            </Text>
            <Text className={classes.text}>+375 33 112 22 45</Text>
            <Text className={classes.text}>+375 29 222 44 88</Text>
            <Text className={classes.text}>dev@agsr.by</Text>
            <Text className={classes.text}>
              г. Минск, ул. К.Цеткин, д. 24-705
            </Text>
          </Box>

          <Group gap={20} className={classes.partners}>
            <Image alt="partner" src={FirstPartnerImg} height={40} width={135} />
            <Box className={classes.partner}>
              <Text>Условный партнёр</Text>
            </Box>
            <Box className={classes.partner}>
              <Text>Условный партнёр</Text>
            </Box>
            <Box className={classes.partner}>
              <Text>Условный партнёр</Text>
            </Box>
          </Group>

          <Center
            style={{
              paddingTop: 21,
              gridColumnStart: 'span 3',
            }}
          >
            <Text className={classes.developer}>
              © АИС «Реестры»
              <br />
              Разработчк: ОАО «Агентство сервисизации и реинжиниринга» (г. Минск,
              ул. К. Цеткин, д. 24-705 dev@agsr.by)
            </Text>
          </Center>
        </Box>
      </Container>
    </AppShellFooter>
  )
}
