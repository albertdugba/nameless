import { formatDistance } from 'date-fns'
import { ChangeEvent, FC, useState } from 'react'
import Gravatar from 'react-gravatar'
import * as Icons from '@icons/index'
import { Reply } from '../interface/comment'
import { Button } from '@elements/Button'
import { useAddCommentReply } from '@features/replies/api/addReply'

interface CommentProps {
  message: string
  commentId: number
  postId: number
  createdAt: Date
  replies: Reply[]
}
export const SingleComment: FC<CommentProps> = ({
  message,
  postId,
  createdAt,
  replies,
  commentId,
}) => {
  const [toggledInput, setToggledInput] = useState(false)
  const [reply, setReply] = useState('')

  const createReply = useAddCommentReply(postId)

  const handleAddReply = () => {
    createReply.mutate({ body: reply, commentId })
  }

  return (
    <li className="list-none my-2 relative">
      <div className="">
        <div className="flex gap-2">
          <Gravatar
            email={`${postId}@mail.com`}
            className="h-[20px] w-[20px] rounded-full"
          />

          <div className="flex flex-col gap-2 w-full">
            <span className="text-[12px] text-gray-400 my-0 p-0 inline-block">
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </span>
            <div className="relative commentList">
              {/* comment body */}
              <p className="text-[1rem] p-0 -mt-1">{message}</p>
              <div className="flex gap-1 mt-[6px] items-center">
                <div className="flex items-center gap-[7px] justify-between h-full bg-gray-100 rounded-full px-2 py-1">
                  <button
                    aria-label="up arrow"
                    className="flex gap-[3px] items-center"
                  >
                    <Icons.ArrowUp />
                  </button>
                  <span className="text-sm text-gray-500">12</span>
                  <button>
                    <Icons.ArrowDown />
                  </button>
                </div>
                <div className="p-0">
                  <button
                    onClick={() => setToggledInput((prev) => !prev)}
                    className="cursor-pointer hover:bg-gray-200 py-[6px] px-[5px]  rounded-[4px] transition-all"
                  >
                    <Icons.Comment />
                  </button>
                </div>
                <div className="cursor-pointer hover:bg-gray-200 py-[6px] px-[5px]  rounded-[4px] transition-all">
                  <Icons.Share />
                </div>
              </div>

              {/* replies */}
              <div className="w-full flex-col flex mt-2 gap-4">
                {toggledInput && (
                  <div className="flex gap-3 w-full">
                    <Gravatar
                      email={`${postId}@mail.com`}
                      className="h-[20px] w-[20px] rounded-full"
                    />
                    <div className="flex flex-col w-full gap-2">
                      <textarea
                        value={reply}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          setReply(e.target.value)
                        }
                        className="border px-2 py-4 rounded-md w-full outline-none text-gray-500"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleAddReply}
                          variant="primary"
                          size="small"
                        >
                          <div className="whitespace-nowrap px-4 py-1">
                            {createReply.isLoading ? 'Replying...' : 'Reply'}
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {/* replies */}
                <div className="replies">
                  {replies.map((reply) => (
                    <li
                      key={reply.id}
                      className="flex flex-col gap-2 text-[1rem] my-2"
                    >
                      <div className="flex gap-2">
                        <Gravatar
                          email={`${postId}@mail.com`}
                          className="h-[20px] w-[20px] rounded-full"
                        />{' '}
                        {/* <span className="left-0 absolute w-full border-t  bottom-6"></span> */}
                        <span className="text-[12px] text-gray-400 my-0 p-0 inline-block">
                          {formatDistance(new Date(createdAt), new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="my-0 p-0 inline-block pl-7">{reply.body}</p>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
