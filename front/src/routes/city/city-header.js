import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PersonIcon from '@material-ui/icons/Person'
import { useHistory } from 'react-router-dom'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../../contants/colors'
import { ucFirstOnly } from '../../utils/utils'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'
import CITY_IMAGE from '../../assets/images/test-city-image.jpg'
import { COLOR_SECONDARY } from '../../constants/colors'
import { useScroll } from '../../common/hooks/use-scroll'

const MainLayout = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding-top: ${(props) => (props.isMobile ? '0' : '72px')};
`

const ImageView = styled.div`
  height: 220px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
  margin-bottom: ${(props) => (props.isMobile ? '0' : '16px')};
  border-radius: ${(props) => (props.isMobile ? '0' : '8px')};
`

const Region = styled(Typography)`
  && {
    height: 17px;
    font-size: 12px;
    text-align: center;
    position: relative;
    top: 10px;
  }
`

const Name = styled.p`
  && {
    height: ${(props) => (props.fixedView ? '78px' : '46px')};
    line-height: ${(props) => (props.fixedView ? '100px' : '46px')};
    font-weight: 500;
    font-size: ${(props) => (props.fixedView ? '24px' : '18px')};
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
  }
`

const NameMobile = styled.p`
  && {
    height: 46px;
    line-height: 41px;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
  }
`

const CityPreview = styled.div`
  height: ${(props) => (props.isMobile ? '58px' : 'auto')};
  display: flex;
  align-items: center;
`

const CityTab = styled.div`
  height: 46px;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  margin-left: ${(props) => (props.fixedView ? 'auto' : '')};
  margin-right: ${(props) => (props.fixedView ? 'auto' : '')};
  width: ${(props) => (props.fixedView ? 'fit-content' : 'auto')};
`

const CityTabMobile = styled.div`
  height: 46px;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  margin-left: ${(props) => (props.fixedView ? 'auto' : '')};
  margin-right: ${(props) => (props.fixedView ? 'auto' : '')};
  width: ${(props) => (props.fixedView ? 'fit-content' : 'auto')};
`

const TabItem = styled.p`
  && {
    color: ${(props) => (props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
    font-weight: 500;
    font-size: 14px;
    margin-right: ${(props) => (props.fixedView ? '24px' : '68px')};
    margin-left: ${(props) => (props.fixedView ? '24px' : '')};
    position: relative;
    line-height: 46px;
    cursor: pointer;
    margin-top: 0;
    margin-bottom: 0;
    
    &:before {
      content: ' ';
      display: ${(props) => (props.selected ? 'block' : 'none')};
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% - 4px);
      background-color: ${COLOR_PRIMARY};
      border-radius: 2px 2px 0px 0px;
      height: 4px;
    }
  }
`

const TabItemMobile = styled.p`
  && {
    color: ${(props) => (props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
    font-weight: 500;
    font-size: 14px;
    margin-right: 0;
    margin-left: 0;
    position: relative;
    line-height: 46px;
    cursor: pointer;
    margin-top: 0;
    margin-bottom: 0;
    justify-content: space-around;
    
    &:before {
      content: ' ';
      display: ${(props) => (props.selected ? 'block' : 'none')};
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% - 4px);
      background-color: ${COLOR_PRIMARY};
      border-radius: 2px 2px 0px 0px;
      height: 4px;
    }
  }
`

const SecondSection = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row-reverse')};
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  max-width: 1024px;
  justify-content: space-between;
`

const PersonIconGreen = styled(PersonIcon)`
  color: ${COLOR_SECONDARY};
  margin-left: 33px;
`

const PreviewItem = styled.div`
  font-size: 10px;
  font-weight: 500;
  margin-left: 12px;

  b {
    font-size: 12px;
    margin-top:  2px;
    display: block;
    font-weight: 700;
  }
`

const FixedLayout = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white; 
  position: fixed;   
  top: 76px; 
  left: 0;
  right: 0;
  height: 124px;
`

const FixedLayoutMobile = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white; 
  position: fixed;   
  top: 0; 
  left: 0;
  right: 0;
  height: 92px;
`

const ArrowBackOutlinedIconDesktopFull = styled(ArrowBackOutlinedIcon)`
  position: relative;
  top: -40px;
  cursor: pointer;
`

const ArrowBackOutlinedIconDesktopSmall = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  top: 36px;
  cursor: pointer;
`

const ArrowBackOutlinedIconMobileSmall = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  left: 20px;
  top: 11px;
  cursor: pointer;
`

const BackLine = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  max-width: 1024px;
  position: relative;
`

export const CityHeader = ({ tabList, tabSelectedIndex, onSelectTab }) => {
  const { city } = useCities()
  const { scrollY } = useScroll()
  const size = useWindowSize()
  const history = useHistory()

  return (
    <>
      <MainLayout isMobile={isMobileView(size)}>
        <ImageView style={{ backgroundImage: `url(${CITY_IMAGE})` }} isMobile={isMobileView(size)}>
          <ArrowBackOutlinedIconDesktopFull onClick={() => history.goBack()} />
        </ImageView>
        <Region>{ucFirstOnly(city['region.new_name'])}</Region>
        <Name>{ucFirstOnly(city.nom_comm)}</Name>
        <SecondSection isMobile={isMobileView(size)}>
          <CityPreview isMobile={isMobileView(size)}>
            <PersonIconGreen />
            <PreviewItem>
              Habitants
              <b>{city.population * 1000}</b>
            </PreviewItem>
            <PersonIconGreen />
            <PreviewItem>
              Température moyenne
              <b>
                {Math.floor(city.average_temperature)}
                °C
              </b>
            </PreviewItem>
          </CityPreview>
          {tabList.length !== 0 && (
            <>
              {isMobileView(size) && (
              <CityTabMobile>
                {tabList.map((t, i) => (
                  <TabItemMobile
                    isMobile={isMobileView(size)}
                    key={t.key}
                    selected={i === tabSelectedIndex}
                    onClick={() => onSelectTab(i)}
                  >
                    {t.label}
                  </TabItemMobile>
                ))}
              </CityTabMobile>
              )}
              {!isMobileView(size) && (
              <CityTab>
                {tabList.map((t, i) => (
                  <TabItem
                    isMobile={isMobileView(size)}
                    key={t.key}
                    selected={i === tabSelectedIndex}
                    onClick={() => onSelectTab(i)}
                  >
                    {t.label}
                  </TabItem>
                ))}
              </CityTab>
              )}
            </>

          )}
        </SecondSection>
      </MainLayout>
      {scrollY >= 296 && (
        <>
          {isMobileView(size) && (
          <FixedLayoutMobile>
            <BackLine isMobile={isMobileView(size)}>
              <ArrowBackOutlinedIconMobileSmall onClick={() => history.goBack()} />
            </BackLine>
            <NameMobile
              fixedView
            >
              {ucFirstOnly(city.nom_comm)}

            </NameMobile>
            <CityTabMobile
              fixedView
            >
              {tabList.map((t, i) => (
                <TabItem
                  fixedView
                  key={t.key}
                  selected={i === tabSelectedIndex}
                  onClick={() => onSelectTab(i)}
                >
                  {t.label}
                </TabItem>
              ))}
            </CityTabMobile>
          </FixedLayoutMobile>
          )}
          {!isMobileView(size) && (
          <FixedLayout>
            <BackLine>
              <ArrowBackOutlinedIconDesktopSmall onClick={() => history.goBack()} />
            </BackLine>
            <Name
              fixedView
            >
              {ucFirstOnly(city.nom_comm)}

            </Name>
            <CityTab
              fixedView
            >
              {tabList.map((t, i) => (
                <TabItem
                  fixedView
                  key={t.key}
                  selected={i === tabSelectedIndex}
                  onClick={() => onSelectTab(i)}
                >
                  {t.label}
                </TabItem>
              ))}
            </CityTab>
          </FixedLayout>
          )}
        </>
      )}
    </>
  )
}

CityHeader.propTypes = {
  tabList: PropTypes.array,
  tabSelectedIndex: PropTypes.number,
  onSelectTab: PropTypes.func
}

CityHeader.defaultProps = {
  tabList: [],
  tabSelectedIndex: 0,
  onSelectTab: () => {}
}
