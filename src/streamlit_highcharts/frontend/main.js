function sendValue(value) {
  Streamlit.setComponentValue(value)
}


function waitForHighcharts(callback, maxAttempts = 10) {
  let attempts = 0;
  
  const checkHighcharts = () => {
    if (typeof Highcharts !== 'undefined') {
      callback();
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(checkHighcharts, 100);
    } else {
      console.error('No se pudo cargar Highcharts después de varios intentos');
    }
  };
  
  checkHighcharts();
}

function onRender(event) {
  waitForHighcharts(() => {
    const {options,height} = event.detail.args
    Streamlit.setFrameHeight(height+20)
    document.getElementById("container").style.height=height+"px"
    Highcharts.chart('container', options);
    window.rendered = true
  });
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()