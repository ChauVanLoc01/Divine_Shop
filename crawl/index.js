document.querySelectorAll(
  "#gatsby-focus-wrapper > div > div > div.ta.gc.Pe > div._e.mg"
).length;
Array(24)
  .fill(0)
  .map((e, i) => {
    const item_name = document.querySelector(
      `#gatsby-focus-wrapper > div > div > div.ta.gc.Pe > div:nth-child(${
        i + 1
      }) > a.Ua.Ra.bf.ia.rc.tc.ra`
    ).textContent;
    const image = document
      .querySelector(
        `#gatsby-focus-wrapper > div > div > div.ta.gc.Pe > div:nth-child(${
          i + 1
        }) > a.lf.gf.ff.ra > img`
      )
      .getAttribute("src");
    const price = document.querySelector(
      `#gatsby-focus-wrapper > div > div > div.ta.gc.Pe > div:nth-child(${
        i + 1
      }) > div > div > div:nth-child(1)`
    ).textContent;
    const priceBeforeDiscount = document.querySelector(
      `#gatsby-focus-wrapper > div > div > div.ta.gc.Pe > div:nth-child(${
        i + 1
      }) > div > div > div.ie.Zd.me`
    ).textContent;
    const data = {
      item_name,
      image,
      price,
      priceBeforeDiscount,
    };
    console.log(data);
  });
