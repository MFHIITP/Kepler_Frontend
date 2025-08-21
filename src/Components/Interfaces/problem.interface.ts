export interface problemInterface {
    id: number,
    name: string,
    description: string,
    difficulty: string,
    displayTestCases: {
        input: {},
        outputReal: string | boolean | BigInt
    }[],
    realTestCases: {
        input: string,
        output: string | boolean | BigInt
    }[],
    inputFormat: string,
    outputFormat: string,
    constraintsTime: string,
    constraintsSpace: string
}

export interface judge0ReturnInterface {
    stdout: string,
    time: string,
    memory: number,
    stderr: string,
    status: {
        description: string
    }
}

export interface outputInterface {
    error: boolean,
    errorMessage: string,
    status: string,
    errorType: string,
    streak: number
}