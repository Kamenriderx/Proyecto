const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const getCalendarTemplate = require("./getCalendarTemplate");
const PeriodAcademic = require("../app/models/periodAcademic");

const generateImage = async (properties,id) => {
  
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log(properties);
    const htmlContent = getCalendarTemplate(properties);

    await page.setContent(htmlContent);
    const contentSize = await page.evaluate(() => {
      const contentElement = document.querySelector("#calendar-content"); 
      const { width, height } = contentElement.getBoundingClientRect();
      return { width, height };
    });
  
    await page.setViewport(contentSize);
  
    const screenshotBuffer = await page.screenshot();
  
    await browser.close();
    const parentDirectory = path.join(__dirname,"..");


    const imagePath = path.join(parentDirectory, `public/images/`, `${properties.pac}.png`);
    await PeriodAcademic.update(
      {
      CALENDAR_REGISTRATION:`http://localhost:3000/images/${properties.pac}.png`
    },
    { where: { ID_PERIOD: id} });
    fs.writeFileSync(imagePath, screenshotBuffer);

  
};

module.exports = generateImage;


