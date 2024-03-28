import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useState } from 'react'
import FullPageLoader from '@shared/FullPageLoader'
import FixedBottomButton from '@shared/FixedBottomButton'
import { CHECK_STATUS } from '@constants/credit'
import useCreditCheck from '@components/credit/hooks/useCreditCheck'
import { updateCredit } from '@remote/credit'
import useUser from '@hooks/useUser'
import { useAlertContext } from '@contexts/AlertContext'

function CreditCheckPage() {
  const navigate = useRouter()
  const user = useUser()
  const { open } = useAlertContext()

  const [isReadyToPoll, setIsReadyToPoll] = useState(true)

  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({ creditScore, userId: user?.id as string }),
  )
  const { data: status } = useCreditCheck({
    onSuccess: (creaditScore) => {
      setIsReadyToPoll(false)
      mutate(creaditScore)
    },
    onError: () => {
      setIsReadyToPoll(false)
      open({
        title: '신용점수 조회에 실패했어요',
        description: '잠시 후 다시 시도해주세요',
        onButtonClick: () => {
          navigate.back()
        },
      })
    },
    enabled: isReadyToPoll,
  })

  return (
    <div>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'REDAY']} />
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedBottomButton label="확인" onClick={() => navigate.back()} />
      ) : null}
    </div>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.REDAY]: '신용점수 조회를 위해 정보를 준비하고있어요.',
  [CHECK_STATUS.PROGRESS]: '신용점수를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}
export default CreditCheckPage
