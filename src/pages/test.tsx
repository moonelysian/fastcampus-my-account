import EventBannerAddButton from '@components/test/EventBannerAddButton'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

function TestPage() {
  return (
    <Flex direction="column">
      <Text bold={true}>배너</Text>
      <EventBannerAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
    </Flex>
  )
}

export default TestPage
