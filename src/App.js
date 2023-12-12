import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import logo from './logo.svg';
import './App.css';
import NestedBox from './nested_box';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #3A6FA2;
  color: #fff; /* Header text color */
  padding: 20px;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  border-radius: 10px;
`;

const StyledTabs = styled(Tabs)`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 80%;
  margin: 0 auto;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  background-color:  border: 1px solid #d0d3d4;;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTab = styled(Tab)`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f3f4;
  margin-right: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:  #d0d3d4;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: none;
  padding: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #d0d3d4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.react-tabs__tab-panel--selected {
    display: block;
  }
`;

const StyledForm = styled.form`
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-right: 8px;
`;

const StyledButton = styled.button`
  padding: 8px;
  background-color: #3A6FA2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function App() {
  const [docList, setDocList] = useState([]);
  const [directory, setDirectory] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);


  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/?directory=${directory}`)
      .then(response => response.text())
      .then(data => {
        const parsedData = JSON.parse(data);
        setDocList(parsedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false); // Reset the formSubmitted state
    }
  }, [directory, formSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="App">
      <StyledHeader>CCDA VIEWER</StyledHeader>
      <StyledForm onSubmit={handleSubmit}
      >
        <StyledInput
          type="text"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
          placeholder="Enter directory"
        />
        <StyledButton type="submit">Load Directory</StyledButton>
      </StyledForm>
      <StyledTabs>
        <StyledTabList>
          {docList.map((doc, index) => {
            const parsedDoc = JSON.parse(doc);
            return (
              <StyledTab key={index}>
                {Object.values(parsedDoc)[0].title}, {index + 1}
              </StyledTab>
            );
          })}
        </StyledTabList>

        {docList.map((doc, index) => {
          const parsedDoc = JSON.parse(doc);
          return (
            <StyledTabPanel key={index}>
              <h2>
                {Object.values(parsedDoc)[0].title}, {index + 1}
              </h2>
              <NestedBox data={parsedDoc} />
            </StyledTabPanel>
          );
        })}
      </StyledTabs>
    </div>
  );
}

export default App;
