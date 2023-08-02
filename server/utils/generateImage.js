const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const getCalendarTemplate = require("./getCalendarTemplate");

const generateImage = async () => {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const content = {
      pac:"III PAC 2023",
      calendar:[
        {date:"Sabado 4 de Septiembre",hour:"9:00 a.m A 11:59 p.m.",students:"PRIMER INGRESO"},
        {date:"Domingo 5 de Septiembre",hour:"9:00 a.m A 11:59 p.m.",students:"84% a 100%"},
        {date:"Lunes 6 de Septiembre",hour:"9:00 a.m A 11:59 p.m.",students:"70% a 83%"},
        {date:"Martes 7 de Septiembre",hour:"9:00 a.m A 11:59 p.m.",students:"0% a 69%"},
      ],
      previousPac:"II PAC 2023",
      initDate:"1 de Septiembre",
      finalDate:"20 de diciembre",
      aditionInterval:"8 al 20 de septiembre"
    }
    const htmlContent = getCalendarTemplate(content);

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


    const imagePath = path.join(parentDirectory, `public/images/`, `${content.pac}.png`);
    fs.writeFileSync(imagePath, screenshotBuffer);
};

module.exports = generateImage;


