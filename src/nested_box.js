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

  .box-container {
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }

  .box {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .key {
    font-weight: bold;
    text-align: left;
  }

  .value {
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

  .box {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .key {
    font-weight: bold;
  }

  .value {
    margin-top: 5px;
  }
`;

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
    return <StyledSecondLevelBox data={value} />;
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
            <div key={index} className="second-level-box-container">
              <div className="box">
                <div className="key">{String(key)}:</div>
                {hasValidChildren ? (
                  <SecondLevelBox data={value}></SecondLevelBox>
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
  if (data === null || typeof data !== 'object') {
    return String(data);
  }

  const entries = Object.entries(data || {});

  if (entries.length === 1) {
    const [key, value] = entries[0];
    if (value === null || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }
    return <StyledSecondLevelBox data={value} />;
  }

  return (
    <StyledNestedBox>
      <div className="nested-box">
        {Object.entries(data || {}).map(([key, value], index) => {
          if (value === null || typeof value === 'string') {
            return null;
          }
          const hasValidChildren = Object.keys(value).length > 0;

          return (
            <div key={index} className="box-container">
              <div className="box">
                <div className="key">{String(key)}:</div>
                {hasValidChildren ? (
                  <SecondLevelBox data={value}></SecondLevelBox>
                ) : (
                  <div className="value">{String(value)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </StyledNestedBox>
  );
}

export default NestedBox;
