// NestedBox.js
import React from 'react';
import styled from 'styled-components';

const StyledNestedBox = styled.div`
  background-color: #f9f9f9; /* Light gray background color */
  border: 1px solid #7fbfff;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;

  .box-container {
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


function NestedBox({ data }) {
  if (data === null || typeof data !== 'object') {
    return String(data);
  }

  const entries = Object.entries(data || {});

  if (entries.length === 1) {
    // If there's only one item, display it without the index
    const [key, value] = entries[0];
    if (value === null || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }
    return <NestedBox data={value} />;
  }

  return (
    <StyledNestedBox>

    <div className="nested-box">
      {Object.entries(data || {}).map(([key, value], index) => {
        // Check if the value is null, and return null if it is
        if (value === null || (typeof value === 'string' && value.trim() === '')) {
          return null;
        }
        // Check if the object has any properties
        const hasValidChildren = Object.keys(value).length > 0;

        return (
          <div key={index} className="box-container">
            <div className="box">
              <div className="key">{String(key)}:</div>
              {hasValidChildren ? (
                <NestedBox data={value}></NestedBox>
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
