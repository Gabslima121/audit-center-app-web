import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import translate from '../../../../helpers/translate'
import { ticketsCommentsApi } from '../../../../hooks/api/ticketsCommentsApi'
import { sucessMessage } from '../../../../utils/Toast/toast'

type Comments = {
  id: string
  content: string
  author: {
    name: string
    email: string
  }
  registeredAt: string
}

const COMMENT_INITIAL_STATE = {
  id: '',
  content: '',
  author: {
    name: '',
    email: '',
  },
  registeredAt: '',
}

function useTicketsDetailed() {
  const { id } = useParams()
  const commentsService = ticketsCommentsApi()
  const [comments, setComments] = useState<Comments[]>([COMMENT_INITIAL_STATE])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getCommentsByTicketId = async () => {
    const response = await commentsService.getCommentsByTicket(id)

    if (response) {
      setComments(response)
    }
  }

  async function handleCreateComment() {
    setIsLoading(true)
    const response = await commentsService.createComment(id, {
      content: newComment,
    })

    if (response) {
      setNewComment('')
      setIsLoading(false)
      return sucessMessage(translate('comments_registered'))
    }
  }

  async function handleDeleteComment(commentId: string) {
    const response = await commentsService.deleteComment(commentId)

    if (response) {
      getCommentsByTicketId()
    }
  }

  useEffect(() => {
    getCommentsByTicketId()
  }, [id, isLoading])

  return {
    comments,
    newComment,
    setNewComment,
    handleCreateComment,
    isLoading,
    handleDeleteComment,
  }
}

export { useTicketsDetailed }
