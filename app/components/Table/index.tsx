import type { AutomatedInformationSystem } from '@prisma/client'
import {
  Center,
  Chip,
  ChipGroup,
  Group,
  Pagination,
  Stack,
  Text,
} from '@mantine/core'
import {
  IconBook,
  IconChevronRight,
  IconNotebook,
  IconServer,
} from '@tabler/icons-react'

import classes from './styles.module.css'

interface Props {
  totalCount: number
  items: Partial<AutomatedInformationSystem>[]
  params: {
    page: number
    perPage: number
  }
  handleParams: (key: string, value: string | number) => void
}

const PRE_PAGE_VALUES = ['25', '50', '100']

export function Table({ items, totalCount, params, handleParams }: Props) {
  const { perPage } = params
  const pageCount = Math.ceil(totalCount / perPage)

  return (
    <Stack gap={20}>
      <Group justify="space-between">
        <Text className={classes.tableName}>Список АИС</Text>

        <Group gap={10}>
          <Text className={classes.chipText}>Показывать по:</Text>

          <ChipGroup
            defaultValue="25"
            onChange={(value) => {
              handleParams('page', 1)
              handleParams('perPage', Number(value))
            }}
          >
            <Group>
              {PRE_PAGE_VALUES.map(value => (
                <Chip
                  h={32}
                  key={value}
                  value={value}
                  color="#13A3B9"
                  radius="5px"
                  className={classes.chip}
                >
                  <Text className={classes.chipText}>{value}</Text>
                </Chip>
              ))}
            </Group>
          </ChipGroup>
        </Group>
      </Group>

      <Stack mih={535} className={classes.table} gap={0}>
        {items.map((item, index) => (
          <Group key={index} className={classes.itemWrapper}>
            <Text className={classes.name}>{item.name}</Text>

            <Group gap={5}>
              <Group className={classes.data}>
                <IconServer color="#676A71" />
                <Text
                  className={classes.dataText}
                  style={{
                    color: item.electronicServices
                      ? '#13A3B9'
                      : '#272A33',
                  }}
                >
                  {item.electronicServices}
                </Text>
                <IconChevronRight color="#676A71" />
              </Group>

              <Group className={classes.data}>
                <IconBook color="#676A71" />
                <Text
                  className={classes.dataText}
                  style={{
                    color: item.metadata ? '#13A3B9' : '#272A33',
                  }}
                >
                  {item.metadata}
                </Text>
                <IconChevronRight color="#676A71" />
              </Group>

              <Group className={classes.data}>
                <IconNotebook color="#676A71" />
                <Text
                  className={classes.dataText}
                  style={{
                    color: item.references ? '#13A3B9' : '#272A33',
                  }}
                >
                  {item.references}
                </Text>
                <IconChevronRight color="#676A71" />
              </Group>
            </Group>
          </Group>
        ))}
      </Stack>

      <Center>
        <Pagination
          withEdges
          size="lg"
          color="#13A3B9"
          total={pageCount}
          value={params.page}
          onChange={value => handleParams('page', value)}
        />
      </Center>
    </Stack>
  )
}
