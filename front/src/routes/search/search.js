import React, { lazy, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components/main-layout'
import { CODE_ROMES } from '../../contants/romes'

const StepBlock = styled(Typography)`
  && {
    margin: 28px 16px 48px 16px;
    font-size: 12px;
    font-weight: bold;
  }
`

const ALL_STEPS = [{
  components: lazy(() => import('./step1'))
}, {
  components: lazy(() => import('./step2'))
}, {
  components: lazy(() => import('./step3'))
}, {
  components: lazy(() => import('./step4'))
}, {
  components: lazy(() => import('./step5'))
}]

const SearchPage = () => {
  const { criterions } = useCities()
  const [index, setIndex] = useState(0)
  const [onSearch, setOnSearch] = useState(null)

  if (!criterions) {
    return <p>Loading...</p>
  }

  const onNextStep = () => {
    if (index + 1 >= ALL_STEPS.length) {
      const params = {
        code_rome: CODE_ROMES
      }

      /* if (data.regions) {
        params = { ...params, code_region: [data.regions] }
      }
      if (data.environment) {
        const tab = (params.code_criterion || [])
        tab.push(data.environment)
        params = { ...params, code_criterion: tab }
      }
      if (data.city) {
        const tab = (params.code_criterion || [])
        tab.push(data.city)
        params = { ...params, code_criterion: tab }
      } */

      setOnSearch(params)
    } else {
      setIndex(index + 1)
    }
  }

  if (onSearch) {
    const params = []
    Object.entries(onSearch).forEach(([key, value]) => {
      params.push(`${key}:${value.join(',')}`)
    })

    return <Redirect to={`/cities?${params.join(';')}`} />
  }

  const Component = ALL_STEPS[index].components

  return (
    <MainLayout menu={{
      title: 'Ma recherche', logo: false, mainHeight: 56, backButton: '/'
    }}
    >
      <StepBlock>
        Etape
        {' '}
        {index + 1}
        /
        {ALL_STEPS.length}
      </StepBlock>
      <Component onNext={onNextStep} />
    </MainLayout>
  )
}

export default SearchPage
