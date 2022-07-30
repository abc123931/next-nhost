export const pagesPath = {
  "publicTodo": {
    $url: (url?: { hash?: string }) => ({ pathname: '/publicTodo' as const, hash: url?.hash })
  },
  "signIn": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signIn' as const, hash: url?.hash })
  },
  "signUp": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signUp' as const, hash: url?.hash })
  },
  "todo": {
    $url: (url?: { hash?: string }) => ({ pathname: '/todo' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico'
} as const

export type StaticPath = typeof staticPath
