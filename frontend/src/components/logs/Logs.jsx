import React, { useEffect } from "react";
import "./logs.css";
import { useMyContext } from "../../context/MyProvider";

const Logs = () => {
  const { logData } = useMyContext();
  console.log(logData);

  return (
    <div className="logsContainer">
      <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
        Total : {logData.length}
      </p>
      {logData && logData.length > 0 ? (
        logData.map((log, index) => (
          <div className="log" key={index}>
            <span className="logTitle red">Level</span> :
            <span className="logData green">{log.level}</span>
            <br />
            <span className="logTitle red">Message</span> :
            <span className="logData green">{log.message}</span>
            <br />
            <span className="logTitle red">Resource Id</span> :
            <span className="logData green">{log.resourceId}</span>
            <br />
            <span className="logTitle red">Timestamp</span> :
            <span className="logData green">{log.timestamp}</span>
            <br />
            <span className="logTitle red">Trace Id</span> :
            <span className="logData green">{log.traceId}</span>
            <br />
            <span className="logTitle red">Span Id</span> :
            <span className="logData green">{log.spanId}</span>
            <br />
            <span className="logTitle red">Commit Id</span> :
            <span className="logData green">{log.commit}</span>
            <br />
            <span className="logTitle red">Parent Resource Id</span> :
            <span className="logData green">
              {log.metadata.parentResourceId}
            </span>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Logs;
