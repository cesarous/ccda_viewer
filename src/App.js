import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import logo from './logo.svg';
import './App.css';
import {JSONTree} from 'react-json-tree';
import NestedBox from './nested_box';
import styled from 'styled-components';


const StyledHeader = styled.header`
  background-color: #7fbfff; /* Lighter blue background color */
  color: #fff; /* Header text color */
  padding: 20px;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
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
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTab = styled(Tab)`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  margin-right: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3498db;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: none;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.react-tabs__tab-panel--selected {
    display: block;
  }
`;

function App() {
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
      .then(response => response.text())
      .then(data => {
        const parsedData = JSON.parse(data);
        setDocList(parsedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <StyledHeader>Your Header Title</StyledHeader>
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
