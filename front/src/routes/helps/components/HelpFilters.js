import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { ProjectsSelect, JobSituationSelect, AgeSituationSelect, ActionButton, Button } from '../../../components'

import { AGE_SITUATIONS, JOB_SITUATIONS, PROJECTS } from '../../../constants/search'
import { ReactComponent as ResetIcon } from '../../../assets/images/icons/reset.svg'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'

const Container = styled.div`
    max-width: 1036px;
    width: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: ${ ({ $isMobile }) => ($isMobile ? `column` : `row`) };
    justify-items: ${ ({ $isMobile }) => ($isMobile ? `start` : `center`) };;
    gap: 8px;
`

const HelpFilters = () => {

    const isMobile = isMobileView(useWindowSize())
    const { search } = useLocation()

    const [ projectsSelected, setProjectsSelected ] = useState([])
    const [ jobSituationSelected, setJobSituationSelected ] = useState('')
    const [ ageSelected, setAgeSituationSelected ] = useState('')

    useEffect(() => {
        const entries = new URLSearchParams(search).entries()
        
        for (let entry of entries) {
            const value = entry[1]

            const projectFound = PROJECTS.find(project => project.key === value)
            const ageSituationFound = AGE_SITUATIONS.find(ageSituation => ageSituation.key === value)
            const jobSituationFound = JOB_SITUATIONS.find(jobSituation => jobSituation.key === value)

            if (!!projectFound) {
                // append to existing project, removing duplicated values with Set's constructor
                setProjectsSelected(projectsSelected => [...new Set([
                    ...projectsSelected,
                    projectFound.option
                ])])
            } else if (!!ageSituationFound) {
                setAgeSituationSelected(ageSituationFound.option)
            } else if (!!jobSituationFound) {
                setJobSituationSelected(jobSituationFound.option)
            }
        }
    }, [search])

    const computeSearchPath = useCallback(() => {
        let projectsURLFormatted = null
        let jobSituationURLFormatted = null
        let ageURLFormatted = null
    
        if (!!projectsSelected && projectsSelected.length > 0) {
          projectsURLFormatted = projectsSelected.map(project => {
            return `project=${PROJECTS.find(p => p.option === project)?.key}`
          }).join('&')
        }
    
        if (!!jobSituationSelected) {
          jobSituationURLFormatted = `situation=${JOB_SITUATIONS.find(j => j.option === jobSituationSelected)?.key}`
        }
    
        if (!!ageSelected) {
          ageURLFormatted = `situation=${AGE_SITUATIONS.find(a => a.option === ageSelected)?.key}`
        }
        
        const paramsURLFormatted = [
          projectsURLFormatted,
          jobSituationURLFormatted,
          ageURLFormatted
        ]
          .filter(item => item != null)
          .join('&')
    
        return `/aides?${paramsURLFormatted}`
      }, [ projectsSelected, jobSituationSelected, ageSelected ])
    
    const resetInputs = () => {
        setProjectsSelected([])
        setJobSituationSelected('')
        setAgeSituationSelected('')
    }

    return (
        <Container $isMobile={isMobile}>
            <ProjectsSelect
                style={{ flex: 3 }}
                value={projectsSelected}
                onChange={(projects) => setProjectsSelected(projects)}
            ></ProjectsSelect>

            <JobSituationSelect
                style={{ flex: 2 }}
                value={jobSituationSelected}
                onChange={(jobSituation) => setJobSituationSelected(jobSituation)}
            ></JobSituationSelect>

            <AgeSituationSelect
                style={{ flex: 2 }}
                value={ageSelected}
                onChange={(ageSituation) => setAgeSituationSelected(ageSituation)}
            ></AgeSituationSelect>

            <ActionButton
                style={{ flex: 2, minHeight: 73 }}
                path={computeSearchPath()}
                isBlue
            ></ActionButton>

            {
                isMobile
                    ? (<Button
                        primary={false}
                        light={true}
                        onClick={resetInputs}
                    >
                        <ResetIcon />
                        Réinitialiser
                    </Button>)
                    : null
            }
        </Container>
    )
}

HelpFilters.propTypes = {}

export default HelpFilters
