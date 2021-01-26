import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/button'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'
import { NB_MAX_REGION } from '../../contants/search'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 8px 0;
  }
`

const SmallTitle = styled(Typography)`
  && {
    margin: 0 0 24px 0;
  }
`

const Step3Component = ({ onNext, values }) => {
  const {
    criterions
  } = useCities()
  const [regions, setRegions] = useState([])

  const toggleRegion = (event) => {
    const region = event.target.value
    setRegions([region])
  }

  useEffect(() => {
    if (values.regions) {
      setRegions(values.regions)
    }
  }, [values])

  return (
    <Wrapper>
      <Title>Dans quelle région ?</Title>
      <SmallTitle>Seules les régions en tensions sont disponibles.</SmallTitle>
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Région</InputLabel>
        <Select
          value={regions && regions.length > 0 ? regions[0] : ''}
          displayEmpty
          onChange={toggleRegion}
          input={<Input />}
          inputProps={{
            name: 'Région',
            id: 'age-native-simple'
          }}
        >
          <MenuItem selected value="">
            Toutes les regions
          </MenuItem>
          {criterions.regions.filter((r) => r.criterions && r.criterions[values.rome])
            .map((r) => (
              <MenuItem key={r.id} value={r.id}>
                {ucFirst(r.label.toLowerCase())}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        style={{
          fontWeight: 'normal', margin: '32px 0', boxShadow: '0 4px 5px 0 rgba(0,0,0,0.2)'
        }}
        onClick={() => onNext({ regions })}
      >
        Suivant
        {' '}
        {regions.length > NB_MAX_REGION ? `(max ${NB_MAX_REGION})` : ''}
      </Button>
    </Wrapper>
  )
}

Step3Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object
}

Step3Component.defaultProps = {
  onNext: () => {},
  values: {}
}

export default Step3Component
