'use client';
import React, { createContext, useReducer } from 'react';

export interface SDCGeneratorContextState {
  componentName: string;
  setComponentName: (componentName: string) => void;
}

const defaultGeneratorState: SDCGeneratorContextState = {
  componentName: '',
  setComponentName: (componentName: string) => {
  },
};

export const SDCGeneratorContext: React.Context<SDCGeneratorContextState> = createContext<SDCGeneratorContextState>(defaultGeneratorState);
SDCGeneratorContext.displayName = 'SDCGeneratorContext';

enum SDCGeneratorContextActionType {
  SET_COMPONENT_NAME = 'setComponentName',
}

interface SDCGeneratorContextAction {
  type: SDCGeneratorContextActionType;
  payload?: any;
}

const runReducer = (state: SDCGeneratorContextState, action: SDCGeneratorContextAction) => {
  switch (action.type) {
    case SDCGeneratorContextActionType.SET_COMPONENT_NAME:
      return {
        ...state,
        componentName: action.payload,
      };
    default:
      return state;
  }
};

interface SDCGeneratorProviderProps {
  children: React.ReactNode
}

export const SDCGeneratorProvider = ({
                                       children,
                                     }: SDCGeneratorProviderProps) => {
  const [state, dispatch] = useReducer(runReducer, defaultGeneratorState);

  const {
    componentName,
  } = state;

  const providerState = {
    componentName,
    setComponentName: (componentName: string) => {
      dispatch({
        type: SDCGeneratorContextActionType.SET_COMPONENT_NAME,
        payload: componentName,
      });
    },
  };

  return (
    <SDCGeneratorContext.Provider value={providerState}>
      {children}
    </SDCGeneratorContext.Provider>
  );
};
