export function log(): MethodDecorator {
  return (target: Function, key: string, descriptor: any) => {

    const originalMethod = descriptor.value;

    descriptor.value = (...args: any[]) => {

      console.log(`Entering ${key} method`);
      const result = originalMethod.apply(this, args);
      console.log(`Leaving ${key} method`);

      return result;
    };

    return descriptor;
  };
}
