import _ from 'lodash'
import { Check, MinusCircle, PlusCircle } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../../../components/Button/Button'
import { Container } from '../../../../components/Container/Container'
import { Input } from '../../../../components/Input/Input'
import { Label } from '../../../../components/Label/Label'
import { Select } from '../../../../components/Select/Select'
import translate from '../../../../helpers/translate'
import { auditApi } from '../../../../hooks/api/auditApi'
import { slaApi } from '../../../../hooks/api/slaApi'
import {
  AUDIT_ITEMS_STATUS,
  AUDIT_STATUS_ARRAY,
} from '../../../../helpers/constants'
import { userApi } from '../../../../hooks/api/userApi'
import { departmentsApi } from '../../../../hooks/api/departmentsApi'
import { sucessMessage, errorMessage } from '../../../../utils/Toast/toast'
import { ticketItemApi } from '../../../../hooks/api/ticketItemApi'
import { TICKET_INITIAL_STATE, TICKET_ITEM_INITIAL_STATE } from './schema'
import { TicketItemInfo } from './TicketItemInfo'

function TicketDetailed() {
  const slaService = slaApi()
  const auditSerivce = auditApi()
  const userService = userApi()
  const ticketItemService = ticketItemApi()
  const departmentService = departmentsApi()
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [ticketInfo, setTicketInfo] = useState(TICKET_INITIAL_STATE)
  const [companyId, setCompanyId] = useState('')
  const [slaOptions, setSlaOptions] = useState<any>([])
  const [userOptions, setUserOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])
  const [ticketItemInfo, setTicketItemInfo] = useState(
    TICKET_ITEM_INITIAL_STATE,
  )
  const [formList, setFormList] = useState([
    [
      ...ticketItemInfo,
    ],
  ])

  const getTicektData = async () => {
    const ticket = await auditSerivce.getAuditById(id)
    setTicketInfo((prevState: typeof ticketInfo) => ({
      ...prevState,
      ...ticket,
    }))

    setCompanyId(ticket?.company?.id)
  }

  const getSlaByCompany = async () => {
    const sla = await slaService.getAllSlaByCompany(companyId)

    const mappedSla = _.map(sla, item => {
      return {
        id: item?.id,
        name: `${item?.name} / ${item?.sla} ${item?.typeSla}`,
      }
    })

    setSlaOptions(mappedSla)
  }

  const handleChangeTicketData = (
    property: string,
    event?: {
      target: { id: any; value: any }
    },
  ) => {
    const param = { [property]: event?.target?.value }

    setTicketInfo((prevState: typeof ticketInfo) => ({
      ...prevState,
      ...param,
    }))
  }

  const getUserByCompany = async () => {
    const users = await userService.getUserByCompanyId(companyId)

    const mappedUsers = _.map(users, user => {
      return {
        id: user?.id,
        name: user?.name,
      }
    })

    const responsableUser = _.filter(users, (user: any) => {
      return user?.id === ticketInfo?.responsable?.id
    })

    const analystUser = _.filter(users, (user: any) => {
      return user?.id === ticketInfo?.analyst?.id
    })

    setUserOptions(mappedUsers)
    setTicketInfo((prevState: typeof ticketInfo) => ({
      ...prevState,
      responsable: {
        name: responsableUser[0]?.name,
        id: responsableUser[0]?.id,
      },
      analyst: {
        name: analystUser[0]?.name,
        id: analystUser[0]?.id,
      },
    }))
  }

  const getDepartmentByCompany = async () => {
    const departments = await departmentService.getDepartmentsByCompanyId(
      companyId,
    )

    const mappedDepartments = _.map(departments, department => {
      return {
        id: department?.id,
        name: `${department?.name}`,
      }
    })

    const responsableDepartment = _.filter(departments, (department: any) => {
      return department?.id === ticketInfo?.responsableArea?.id
    })

    setDepartmentOptions(mappedDepartments)
    setTicketInfo((prevState: typeof ticketInfo) => ({
      ...prevState,
      responsableArea: {
        name: responsableDepartment[0]?.name,
        id: responsableDepartment[0]?.id,
      },
    }))
  }

  const handleAddFormList = () => {
    setFormList((prevState: typeof formList) => [
      ...prevState,
      {
        ...ticketItemInfo,
      },
    ])
  }

  const handleRemoveFormList = (index: number) => {
    setFormList((prevState: typeof formList) => {
      const newFormList = [...prevState]
      newFormList.splice(index, 1)
      return newFormList
    })
  }

  const handleChangeFormList = (e: Event, index: any) => {
    const { value, id } = e.target as HTMLInputElement

    setFormList((prevState: typeof formList) => {
      const newFormList = [...prevState]
      newFormList[index][id] = value
      return newFormList
    })
  }

  const getTicketItemById = async () => {
    const response = await ticketItemService.getTicketItemByTicketId(id)

    if (response) {
      setTicketItemInfo(response)
      return
    }
  }

  async function handleUpdateTicketInfo() {
    const response = await auditSerivce.updateAudit(id, {
      ...ticketInfo,
      analyst: ticketInfo?.analyst?.id,
      responsable: ticketInfo?.responsable?.id,
      responsableArea: ticketInfo?.responsableArea?.id,
      sla: ticketInfo?.sla,
      company: ticketInfo?.company?.id,
    })
    if (response) {
      sucessMessage(translate(`${response?.message}`))
      window.location.href = '/home'
    }
  }

  useEffect(() => {
    getTicektData()
    if (companyId) {
      getSlaByCompany()
      getUserByCompany()
      getDepartmentByCompany()
      getTicketItemById()
    }
  }, [id, companyId])

  useEffect(() => {
    console.log(formList)
  }, [formList])

  return (
    <div className="flex-auto mt-5">
      <Container>
        <div className="grid grid-cols-4">
          <div className="col-span-2 border-r-2 border-gray-500 border-opacity-50 overflow-y-scroll h-custom">
            <h1 className="text-3xl">{translate('ticket_detailed')}</h1>
            <div className="m-3">
              <form>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label
                      htmlFor="title"
                      text={translate('ticket.title')}
                      className="text-lg mb-1"
                    />
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                      value={ticketInfo?.title}
                      onChange={() => handleChangeTicketData('title')}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="responsable"
                      text={translate('ticket.responsable')}
                      className="text-lg mb-1"
                    />
                    <Select
                      options={userOptions}
                      id="responsable"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                      value={ticketInfo?.responsable?.id}
                      onChange={option =>
                        handleChangeTicketData('responsable', option)
                      }
                      placeholder={translate('ticket.responsable')}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="responsableArea"
                      text={translate('ticket.department')}
                      className="text-lg mb-1"
                    />
                    <Select
                      options={departmentOptions}
                      id="responsableArea"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                      value={ticketInfo?.responsableArea?.id}
                      onChange={option =>
                        handleChangeTicketData('responsableArea', option)
                      }
                      placeholder={translate('ticket.department')}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="analyst"
                      text={translate('ticket.analyst')}
                      className="text-lg mb-1"
                    />
                    <Select
                      options={userOptions}
                      id="analyst"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                      value={ticketInfo?.analyst?.id}
                      onChange={option =>
                        handleChangeTicketData('analyst', option)
                      }
                      placeholder={translate('ticket.analyst')}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="status"
                      text={translate('ticket.status')}
                      className="text-lg mb-1"
                    />
                    <Select
                      options={AUDIT_STATUS_ARRAY}
                      id="status"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                      value={ticketInfo?.status}
                      onChange={option =>
                        handleChangeTicketData('status', option)
                      }
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="sla"
                      text={translate('ticket.sla')}
                      className="text-lg mb-1"
                    />
                    <Select
                      options={slaOptions}
                      placeholder={translate('select_sla')}
                      id="sla"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                      value={ticketInfo?.sla?.id}
                      onChange={option => handleChangeTicketData('sla', option)}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="openDate"
                      text={translate('ticket.openDate')}
                      className="text-lg mb-1 opacity-60"
                    />
                    <Input
                      type="text"
                      id="openDate"
                      name="openDate"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
                      value={ticketInfo?.openDate}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="limitDate"
                      text={translate('ticket.limitDate')}
                      className="text-lg mb-1 opacity-60"
                    />
                    <Input
                      type="text"
                      id="limitDate"
                      name="limitDate"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
                      value={ticketInfo?.limitDate}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="company"
                      text={translate('company')}
                      className="text-lg mb-1 opacity-60"
                    />
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
                      value={ticketInfo?.company?.corporateName}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <Label
                    htmlFor="description"
                    text={translate('ticket.description')}
                    className="text-lg mb-1"
                  />
                  <textarea
                    id="description"
                    name="description"
                    className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                    value={ticketInfo?.description}
                    onChange={() => handleChangeTicketData('description')}
                  />
                </div>

                <div className="flex flex-row-reverse">
                  <div>
                    <Button onClick={handleUpdateTicketInfo} type="button">
                      {translate('save_informations')}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <hr className="w-3/4 m-auto" />

            <div className="mt-3">
              <div>
                <h1 className="text-3xl">{translate('audited_items')}</h1>
              </div>

              <div className="m-4">
                <form>
                  <div className="grid grid-cols-5 gap-3 mt-3">
                    {formList.map((formItem: any, index) => (
                      <>
                        <div key={index} className="col-span-1.5">
                          <Label
                            htmlFor="item"
                            text={translate('ticket_item')}
                            className="text-lg mb-1"
                          />
                          <Input
                            type="text"
                            id="item"
                            name="item"
                            className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                            value={formItem?.item}
                            onChange={(e: any) =>
                              handleChangeFormList(e, index)
                            }
                          />
                        </div>

                        <div key={index} className="col-span-1.5">
                          <Label
                            htmlFor="itemStatus"
                            text={translate('ticket_item_status')}
                            className="text-lg mb-1"
                          />
                          <Select
                            options={AUDIT_ITEMS_STATUS}
                            id="itemStatus"
                            className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                            value={formItem?.status}
                            placeholder={translate(
                              'ticket_item_status_placeholder',
                            )}
                            onChange={(e: any) =>
                              handleChangeFormList(e?.target?.value, index)
                            }
                          />
                        </div>

                        <div key={index}>
                          <Label
                            htmlFor="itemDescription"
                            text={translate('ticket_item_description')}
                            className="text-lg mb-1"
                          />
                          <textarea
                            id="itemDescription"
                            name="description"
                            className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                            value={formItem?.description}
                            onChange={(e: any) =>
                              handleChangeFormList(e, index)
                            }
                          />
                        </div>

                        {formList.length > 1 && (
                          <>
                            <div className="mt-14 w-7 ml-20">
                              <span className="cursor-pointer">
                                <Check size={24} color="#40a700" />
                              </span>
                            </div>

                            <div className="mt-14 w-7">
                              <span className="cursor-pointer">
                                <MinusCircle
                                  size={24}
                                  color="#cc2828"
                                  onClick={() => handleRemoveFormList(index)}
                                />
                              </span>
                            </div>
                          </>
                        )}

                        {formList.length - 1 === index && (
                          <div className="inline-grid col-span-2 grid-cols-2 items-center w-full">
                            <div>
                              <span className="text-brand-400">
                                {translate('add_new_item')}
                              </span>
                            </div>

                            <div>
                              <PlusCircle
                                onClick={handleAddFormList}
                                size={24}
                                color="#2885CC"
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>

                  <div className="flex flex-row-reverse">
                    <div>
                      <Button type="button">
                        {translate('save_informations')}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="ml-2 col-span-2 relative">
            <h1 className="ml-2 text-3xl">{translate('ticket_comments')}</h1>

            {comments ? (
              <div className="text-center items-center">
                <span>{translate('no_comments_registered')}</span>
              </div>
            ) : (
              <div>
                <h1>Aqui ficarao os comentarios</h1>
              </div>
            )}

            <div className="absolute bottom-0 w-full">
              <Label
                htmlFor="typeComment"
                text={translate('type_comment')}
                className="text-lg mb-1"
              />
              <textarea
                id="typeComment"
                name="typeComment"
                className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
              />
              <div className="float-right">
                <Button>{translate('save_comment')}</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { TicketDetailed }
