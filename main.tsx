import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';


export interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: 'string' },
  { id: 2, name: "Длина", type: 'string' }
];

const model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" }
  ],
};


class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initialValues: { [key: number]: string } = {};
    props.model.paramValues.forEach(paramValue => {
      initialValues[paramValue.paramId] = paramValue.value;
    });

    this.state = {
      paramValues: initialValues,
    };
  }

  public getModel(): Model {
    const paramValues = Object.keys(this.state.paramValues).map(key => ({
      paramId: Number(key),
      value: this.state.paramValues[Number(key)],
    }));

    return {
      paramValues,
      colors: [],
    };
  }

  private handleChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map(param => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues[param.id] || ''}
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParamEditor params={params} model={model} />
  </StrictMode>,
)
