export const formatCurrency = (value: number): string => {
    return `$${value.toFixed(2)}`;
  };
  
  export const handleError = (error: any): void => {
    console.error('An error occurred:', error.message || error);
  };
  
  export const displayTable = (data: any[], title?: string): void => {
    if (title) console.log(`\n=== ${title} ===`);
    console.table(data);
  };
  
  export const validateNotEmpty = (input: string): boolean | string => {
    return input.trim() !== '' || 'This field cannot be empty.';
  };
  
  export const confirmAction = async (): Promise<boolean> => {
    const inquirer = await import('inquirer');
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to proceed?',
        default: false,
      },
    ]);
    return confirm;
  };
  