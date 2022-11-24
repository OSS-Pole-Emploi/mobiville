import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import { TextSearchInput } from '../../components'
import { useCities } from '../../common/contexts/citiesContext'
import { useLocation } from 'react-router-dom'

const JobSelect = ({
    onSelect,
    defaultValue
}) => {

    const { search } = useLocation()
    const {
        initializeJobsAutocomplete,
        jobsMatchingCriterions,
        onSearchJobLabels,
        criterions
        // isLoadingJobsMatchingCriterion
    } = useCities()

    const [ value, setValue ] = useState(null)
    const [ inputValue, setInputValue ] = useState(null)

    useEffect(() => {
        if (!!search && !!criterions?.codeRomes && !value) {
            const entries = new URLSearchParams(search).entries()

            for (let entry of entries) {
                const [key, value] = entry
                
                if (key === 'codeRome') {
                    const foundJob = criterions.codeRomes.find(job => job.key === value)
                    if (!!foundJob) {
                        setValue(foundJob)
                    }
                }
            }
        }
    }, [search, criterions?.codeRomes])

    useEffect(() => {
        onSelect(value)
    }, [ value ])

    useEffect(() => {
        if (!!inputValue) {
            debounceOnSearchJobLabels(inputValue)
        }
    }, [ inputValue ])
    
    useEffect(() => {
        initializeJobsAutocomplete()
    }, [])

    const debounceOnSearchJobLabels = useMemo(
        () => debounce((inputValue) => (onSearchJobLabels(inputValue)), 250),
        []
    )

    // trigger when text input has been updated
    const onInputChange = (_, inputValue) => {
        if (!!inputValue) {
            setInputValue(inputValue)
        }
    }

    // trigger when an option is selected
    const onChange = (_, value) => {
        setValue(value)
    }

    return (
        <TextSearchInput
            label="Votre métier"
            placeholder="Saisissez votre métier"
            value={value}
            groupLabel="Métiers"
            options={jobsMatchingCriterions ?? []}
            isOptionEqualToValue={(option, value) => option.label === value.label || (!value.label.includes('(') && option.key === value.key)}
            // loading={isLoadingJobsMatchingCriterion}
            onInputChange={onInputChange}
            onChange={onChange}
            defaultValue={defaultValue}
            openThreshold={2}
            showEndAdornment={false}
        ></TextSearchInput>
    )
}

JobSelect.propTypes = {
    defaultValue: PropTypes.any,
    onSelect: PropTypes.func.isRequired
}

export default JobSelect