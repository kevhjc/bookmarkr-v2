import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import cn from 'classnames'

export default function Submit() {
  const { data: session } = useSession()
  const [count, setCount] = useState(0)

  const onChangeCount = (event: Event) => {
    let newVal = (event.target as HTMLInputElement).value.length
    setCount(newVal)
  }

  return (
    <>
      <div className="my-4 w-full rounded border border-blue-200 bg-blue-50 p-4 duration-300 hover:shadow-xl">
        <form className="relative my-1">
          <input
            aria-label="Submit a URL to the feed"
            placeholder="Submit a URL to the feed"
            type="url"
            required
            disabled={session ? false : true}
            className={cn(
              session
                ? 'mt-1 block w-full rounded-md bg-white px-4 py-2 pr-32 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                : 'mt-1 block w-full rounded-md bg-gray-200 px-4 py-2 pr-32'
            )}
          />
          {session ? (
            <button
              className="w-22 absolute right-1 top-1 flex h-8 items-center justify-center rounded bg-gray-200 px-4 font-medium transition-all hover:bg-gray-300"
              type="submit"
            >
              Submit
            </button>
          ) : null}
          <input
            aria-label="Add a note"
            placeholder="Add a note"
            type="note"
            maxLength={50}
            disabled={session ? false : true}
            className={cn(
              session
                ? 'mt-2 block w-full rounded-md bg-white px-4 py-2 pr-32 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                : 'mt-2 block w-full rounded-md bg-gray-200 px-4 py-2 pr-32'
            )}
            onKeyUp={() => (event ? onChangeCount(event) : 0)}
          />
          <span
            className={cn(
              count <= 25
                ? 'absolute right-1 top-12 flex h-8 items-end justify-end px-1 pt-2 font-medium text-gray-400 transition-all'
                : count > 25 && count <= 40
                ? 'absolute right-1 top-12 flex h-8 items-end justify-end px-1 pt-2 font-bold text-orange-400 transition-all'
                : 'absolute right-1 top-12 flex h-8 items-end justify-end px-1 pt-2 font-bold text-red-400 transition-all'
            )}
          >
            {count} / 50
          </span>
        </form>
        {!session ? (
          <p className="mt-4 font-mono text-sm text-gray-600">
            Hey there! Please sign in with <b>GitHub</b> to add a bookmark to
            the feed. Your information is only used to display your name and
            link to your profile.
          </p>
        ) : null}
      </div>
    </>
  )
}
