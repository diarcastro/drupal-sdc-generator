'use client';
import React, { createContext, useReducer } from 'react';

export enum SDCStatus {
  EXPERIMENTAL = 'experimental',
  STABLE = 'stable',
  DEPRECATED = 'deprecated',
  OBSOLETE = 'obsolete',
}

export interface SDCGeneratorContextState {
  componentName: string;
  setComponentName: (componentName: string) => void;
  status: SDCStatus;
  setStatus: (newStatus: SDCStatus) => void;
}

const defaultGeneratorState: SDCGeneratorContextState = {
  componentName: '',
  status: SDCStatus.STABLE,
  setComponentName: (componentName: string) => {
  },
  setStatus: (newStatus: SDCStatus) => {
  },
};

export const SDCGeneratorContext: React.Context<SDCGeneratorContextState> = createContext<SDCGeneratorContextState>(defaultGeneratorState);
SDCGeneratorContext.displayName = 'SDCGeneratorContext';

enum SDCGeneratorContextActionType {
  SET_COMPONENT_NAME = 'setComponentName',
  SET_COMPONENT_STATUS = 'setComponentStatus',
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
    case SDCGeneratorContextActionType.SET_COMPONENT_STATUS:
      return {
        ...state,
        status: action.payload,
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
    status,
  } = state;

  const providerState = {
    componentName,
    status,
    setComponentName: (componentName: string) => {
      dispatch({
        type: SDCGeneratorContextActionType.SET_COMPONENT_NAME,
        payload: componentName,
      });
    },
    setStatus: (newStatus: SDCStatus) => {
      console.log('setStatus', newStatus);
      dispatch({
        type: SDCGeneratorContextActionType.SET_COMPONENT_STATUS,
        payload: newStatus,
      });
    },
  };

  return (
    <SDCGeneratorContext.Provider value={providerState}>
      {children}
    </SDCGeneratorContext.Provider>
  );
};
