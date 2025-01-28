import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VUE_API_BASE_URL || 'http://localhost:1234',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default {
    getProjects() {
        return apiClient.get('api/projects')
    },

    getEmployees() {
        return apiClient.get('api/employees')
    },

    getEmployeeOvertimeStats(employeeId, date) {
        const params = new URLSearchParams()
        if (employeeId) params.append('employee', employeeId)
        if (date) params.append('request_date', date)
        return apiClient.get(`/api/overtime-requests/?${params}`)
    },

    // Overtime request
    getAllOvertimeRequests() {
        return apiClient.get('/api/overtime-requests/')
    },

    getSingleOvertimeRequest(id) {
        return apiClient.get(`/api/overtime-requests/${id}/`)
    },

    getOvertimeHistory(params) {
        const queryParams = new URLSearchParams()
        
        if (params.employee) queryParams.append('employee', params.employee)
        if (params.project) queryParams.append('project', params.project)
        if (params.startDate) queryParams.append('start_date', params.startDate)
        if (params.endDate) queryParams.append('end_date', params.endDate)
        
        return apiClient.get(`/api/overtime-requests/?${queryParams}`)
    },

    createOvertimeRequest(overtimeData) {
        return apiClient.post('/api/overtime-requests/', overtimeData)
    },

    updateOvertimeRequest(id, overtimeData) {
        return apiClient.put(`/api/overtime-requests/${id}/`, overtimeData)
    },

    deleteOvertimeRequest(id) {
        if (!id) throw new Error('ID is required for deletion');
        return apiClient.delete(`/api/overtime-requests/${id}/`);
    },

    exportFiles(date) {
        return apiClient.post('/api/overtime-requests/export_files/', { date });
    },

    exportOvertimeJson(date) {
        console.log('Exporting JSON for date:', date);
        return apiClient.post('/api/overtime-requests/export_json/',
            { date: date.toString() }  // Ensure date is converted to string
        ).catch(error => {
            console.error('Export JSON error:', error.response?.data || error);
            throw error;
        });
    },

    async getEmployeeStats(employeeId, date) {
        try {
            const params = new URLSearchParams()
            if (employeeId) params.append('employee', employeeId)
            if (date) params.append('request_date', date)
            
            const response = await apiClient.get(`/api/overtime-requests/?${params}`)
            return response
        } catch (error) {
            console.error('Error fetching employee stats:', error)
            throw error
        }
    },
    
    async checkExistingOvertimeRequest(employeeId, date) {
        const params = new URLSearchParams();
        if (employeeId) params.append('employee', employeeId);
        if (date) params.append('request_date', date);

        return apiClient.get(`/api/overtime-requests/?${params.toString()}`);
    },
}