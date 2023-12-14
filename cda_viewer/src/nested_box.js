import React from 'react';
import styled from 'styled-components';

const StyledNestedBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;

  .nested-box {
    display: flex;
    flex-direction: column;
  }

  .nested-box-container {
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }

  .nested-box-item {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .nested-key {
    font-weight: bold;
    text-align: left;
  }

  .nested-value {
    margin-top: 5px;
  }
`;

const StyledSecondLevelBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #7fbfff;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;

  .second-level-box-container {
    display: flex;
    flex-wrap: wrap;
  }

  .second-level-box-item {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .second-level-key {
    font-weight: bold;
  }

  .second-level-value {
    margin-top: 5px;
  }
`;

const StyledContentLevelBox = styled.div`
  background-color: #f9f9f9;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid #000000')};
  padding: ${(props) => (props.noBorder ? '0px' : '15px')};
  margin-top: ${(props) => (props.noBorder ? '0px' : '15px')};

  .content-level-box-container {
    display: flex;
    flex-wrap: wrap;
  }

  .content-level-box-item {
    margin-right: ${(props) => (props.noBorder ? '0px' : '15px')};
    margin-bottom: ${(props) => (props.noBorder ? '0px' : '15px')};
  }

  .content-level-key {
    font-weight: bold;
  }

  .content-level-value {
    margin-top: ${(props) => (props.noBorder ? '0px' : '5px')};
  }
`;

function ContentLevelBox({ data, noBorder }) {
  if (data === null || typeof data !== 'object') {
    return String(data);
  }

  const entries = Object.entries(data || {});

  if (entries.length === 1) {
    const [key, value] = entries[0];
    if (value === null || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }
    return (
      <StyledContentLevelBox noBorder={true}>
        <div className='content-level-box-container'>
          {Object.entries(data || {}).map(([key, value], index) => {
            if (value === null || (typeof value === 'string' && value.trim() === '')) {
              return null;
            }
            const hasValidChildren = Object.keys(value).length > 0;

            return (
              <div key={index} className="content-level-box-item">
                <div className="box">
                  {hasValidChildren ? (
                    <ContentLevelBox data={value} noBorder={true}></ContentLevelBox>
                  ) : (
                    <div className={entries.length === 1 ? "value-no-border" : "value"}>
                      {String(value)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </StyledContentLevelBox>
    );
  }

  return (
    <StyledContentLevelBox noBorder={noBorder}>
      <div className='content-level-box-container'>
        {Object.entries(data || {}).map(([key, value], index) => {
          if (value === null || (typeof value === 'string' && value.trim() === '')) {
            return null;
          }
          const hasValidChildren = Object.keys(value).length > 0;

          return (
            <div key={index} className="content-level-box-item">
              <div className="box">
                <div className="key">{String(key)}:</div>
                {hasValidChildren ? (
                  <ContentLevelBox data={value}></ContentLevelBox>
                ) : (
                  <div className={entries.length === 1 ? "value-no-border" : "value"}>
                    {String(value)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </StyledContentLevelBox>
  );
}


function SecondLevelBox({ data }) {
  if (data === null || typeof data !== 'object') {
    return String(data);
  }

  const entries = Object.entries(data || {});

  if (entries.length === 1) {
    const [key, value] = entries[0];
    if (value === null || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }
   return (
      <StyledSecondLevelBox>
        <ContentLevelBox data={value} noBorder={true} />
      </StyledSecondLevelBox>
    );
  }

  return (
    <StyledSecondLevelBox>
      <div className='second-level-box-container'>
        {Object.entries(data || {}).map(([key, value], index) => {
          if (value === null || (typeof value === 'string' && value.trim() === '')) {
            return null;
          }
          const hasValidChildren = Object.keys(value).length > 0;

          return (
            <div key={index} className="second-level-box-item">
              <div className="box">
                <div className="key">{String(key)}:</div>
                {hasValidChildren ? (
                  <ContentLevelBox data={value}></ContentLevelBox>
                ) : (
                  <div className="value">{String(value)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </StyledSecondLevelBox>
  );
}


function NestedBox({ data }) {
  return (
    <StyledNestedBox>
      <div className="nested-box">
        {Object.entries(data || {}).map(([key, value], index) => {
            const hasValidChildren = Object.keys(value).length > 0;
          if (value === null || typeof value === 'string') {
            return null;
          }
          return (
            <div key={index} className="box-container">
              <div className="box">
                <div className="key">{String(key)}:</div>
                  <SecondLevelBox data={value}></SecondLevelBox>
              </div>
            </div>
          );
        })}
      </div>
    </StyledNestedBox>
  );
}

export default NestedBox;
