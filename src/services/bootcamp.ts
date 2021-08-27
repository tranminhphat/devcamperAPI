import Bootcamp from '../models/Bootcamp';
import { BootcampInput } from '../types/bootcamp';

export const createBootcamp = async (input: BootcampInput) => {
	return await Bootcamp.create(input);
};

export const fetchBootcamps = async () => {
	return await Bootcamp.find();
};

export const fetchBootcampById = async (bootcampId: string) => {
	return await Bootcamp.findById(bootcampId);
};

export const updateBootcampById = async (
	bootcampId: string,
	updateProperties: Partial<BootcampInput>
) => {
	return await Bootcamp.findByIdAndUpdate(bootcampId, updateProperties, {
		new: true,
		runValidators: true,
	});
};

export const deleteBootcampById = async (bootcampId: string) => {
	return await Bootcamp.findByIdAndDelete(bootcampId);
};
