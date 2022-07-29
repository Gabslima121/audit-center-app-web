import { Check, MinusCircle } from 'phosphor-react'
import { Input } from '../../../../components/Input/Input'
import { Label } from '../../../../components/Label/Label'
import { Select } from '../../../../components/Select/Select'
import { AUDIT_ITEMS_STATUS } from '../../../../helpers/constants'
import translate from '../../../../helpers/translate'

interface TicketItemInfoProps {
  item: string
  status: string
  description: string
}

function TicketItemInfo({ description, item, status }: TicketItemInfoProps) {
  return (
    <>
      <div className="col-span-1.5">
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
          value={item}
          // onChange={handleChange}
        />
      </div>

      <div className="col-span-1.5">
        <Label
          htmlFor="status"
          text={translate('ticket_item_status')}
          className="text-lg mb-1"
        />
        <Select
          options={AUDIT_ITEMS_STATUS}
          id="status"
          className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
          value={status}
          placeholder={translate('ticket_item_status_placeholder')}
          // onChange={handleChange}
        />
      </div>

      <div>
        <Label
          htmlFor="description"
          text={translate('ticket_item_description')}
          className="text-lg mb-1"
        />
        <textarea
          id="description"
          name="description"
          className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
          value={description}
          // onChange={handleChange}
        />
      </div>

      <div className="mt-14 w-7 ml-20">
        <span className="cursor-pointer">
          <Check size={24} color="#51d300" />
        </span>
      </div>

      <div className="mt-14 w-7">
        <span className="cursor-pointer">
          <MinusCircle size={24} color="#cc2828" />
        </span>
      </div>
    </>
  )
}

export { TicketItemInfo }
