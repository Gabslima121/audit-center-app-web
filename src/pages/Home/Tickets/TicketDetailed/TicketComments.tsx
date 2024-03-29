import { Spinner, Trash } from 'phosphor-react'
import { useEffect } from 'react'
import { Button } from '../../../../components/Button/Button'
import { Label } from '../../../../components/Label/Label'
import translate from '../../../../helpers/translate'
import { useTicketsDetailed } from './useTicketDetailed'

function TicketComments() {
  const {
    comments,
    handleDeleteComment
  } = useTicketsDetailed()
  return (
    <div className="w-full max-h-96 mt-2 overflow-y-scroll flex flex-col">
      {comments?.map((comment) => (
        <>
          <div className="p-2 w-auto">
            <div className="mb-2 text-sm">
              <span>
                <b>
                  {comment?.author?.name} ({comment?.author?.email})
                </b>
              </span>
            </div>

            <div>
              <textarea
                className="w-3/4 h-auto resize-none p-2 rounded-lg text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                value={comment?.content}
                disabled={true}
              />
            </div>

            <div className="flex align-middle mt-1 float-right">
              <Trash
                size={18}
                className="mt-1 mr-1 cursor-pointer "
                color="#cc2828"
                onClick={() => handleDeleteComment(comment?.id)}
              />
              <span className="cursor-pointer text-exclude_text-100">
              {translate('comment_delete')}
              </span>
            </div>
            <hr className="mt-7"/>
          </div>
        </>
      ))}
    </div>
  )
}

export { TicketComments }
