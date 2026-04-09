import { HiOutlineCode, HiOutlineDatabase, HiOutlineFolder, HiOutlineKey, HiOutlineTerminal } from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'

export const allowedIcon = ['folder', 'database', 'code', 'terminal', 'auth'] as const

type iconType = Record<string, IconType>

export const iconMap: iconType = {
    folder: HiOutlineFolder,
    database: HiOutlineDatabase,
    code: HiOutlineCode,
    terminal: HiOutlineTerminal,
    auth: HiOutlineKey
}
